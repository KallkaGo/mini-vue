class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    this._fn()
  }
}
let activeEffect;
export function effect(fn) {
  // call fn
  const _effect = new ReactiveEffect(fn)

  _effect.run()

}

const targetMap = new Map()
export function track(target, key) {

  // target -> key -> dep

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  dep.add(activeEffect)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(key)
  for (const dep of deps) {
    dep.run()
  }
}