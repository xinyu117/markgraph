import { IWrapContext, IDeferred } from './types';

const uniqId = Math.random().toString(36).slice(2, 8);
let globalIndex = 0;
export function getId(): string {
  globalIndex += 1;
  return `mm-${uniqId}-${globalIndex}`;
}

export function noop(): void {
  // noop
}

/**
 * 树遍历：深度优先，用递归实现先序遍历
 * 树遍历: https://www.jianshu.com/p/5269d1cdfbf2
 * @param tree 根节点
 * @param callback 回调函数
 * @param key 子的key
 */
export function walkTree<T>(
  tree: T,
  callback: (item: T, next: () => void, parent?: T) => void,
  key = 'children'
): void {
  //生成第一个递归函数
  const walk = (item: T, parent?: T): void =>
    callback(
      item,
      //给回调函数的第二个参数赋值（生成第二个函数）
      () => {
        //console.log(item['content']);
        item[key]?.forEach((child: T) => {
          walk(child, item);
        });
      },
      parent
    );
  //调用以上生成的第一个函数，这样第二个函数第一次运行时item就是tree了，一个闭包的应用。
  walk(tree);
}

/**
 * 将类数组转换为数组
 * @param arrayLike 类数组
 * @returns 数组
 */
export function arrayFrom<T>(arrayLike: ArrayLike<T>): T[] {
  if (Array.from) return Array.from(arrayLike);
  const array = [];
  for (let i = 0; i < arrayLike.length; i += 1) {
    array.push(arrayLike[i]);
  }
  return array;
}

export function flatMap<T, U>(
  arrayLike: ArrayLike<T>,
  callback: (item?: T, index?: number, thisObj?: ArrayLike<T>) => U | U[]
): U[] {
  if ((arrayLike as Array<T>).flatMap)
    return (arrayLike as Array<T>).flatMap(callback);
  const array = [];
  for (let i = 0; i < arrayLike.length; i += 1) {
    const result = callback(arrayLike[i], i, arrayLike);
    if (Array.isArray(result)) array.push(...result);
    else array.push(result);
  }
  return array;
}

export function addClass(className: string, ...rest: string[]): string {
  const classList = (className || '').split(' ').filter(Boolean);
  rest.forEach((item) => {
    if (item && classList.indexOf(item) < 0) classList.push(item);
  });
  return classList.join(' ');
}

export function childSelector<T extends Element>(
  filter?: string | ((el: T) => boolean)
): () => T[] {
  if (typeof filter === 'string') {
    const tagName = filter;
    filter = (el: T): boolean => el.tagName === tagName;
  }
  const filterFn = filter;
  return function selector(): T[] {
    let nodes = arrayFrom((this as HTMLElement).childNodes as NodeListOf<T>);
    if (filterFn) nodes = nodes.filter((node) => filterFn(node));
    return nodes;
  };
}

export function wrapFunction<T extends unknown[], U>(
  fn: (...args: T) => U,
  {
    before,
    after,
  }: {
    before?: (ctx: IWrapContext<T, U>) => void;
    after?: (ctx: IWrapContext<T, U>) => void;
  }
) {
  return function wrapped(...args: T) {
    const ctx: IWrapContext<T, U> = {
      args,
      thisObj: this,
    };
    try {
      if (before) before(ctx);
    } catch {
      // ignore
    }
    ctx.result = fn.apply(ctx.thisObj, ctx.args);
    try {
      if (after) after(ctx);
    } catch {
      // ignore
    }
    return ctx.result;
  };
}

export function defer<T>() {
  const obj: Partial<IDeferred<T>> = {};
  obj.promise = new Promise<T>((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  return obj as IDeferred<T>;
}

export function memoize<T extends unknown[], U>(fn: (...args: T) => U) {
  const cache: Record<string, Record<'value', U>> = {};
  return function memoized(...args: T) {
    const key = `${args[0]}`;
    let data = cache[key];
    if (!data) {
      data = {
        value: fn(...args),
      };
      cache[key] = data;
    }
    return data.value;
  };
}
