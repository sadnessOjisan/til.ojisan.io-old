export abstract class Either<T, U> {
  abstract isRight(): boolean;
  abstract fold<X>(l: (t: T) => X, r: (u: U) => X): X;

  isLeft(): boolean {
    return !this.isRight();
  }

  map<B>(f: (U) => B): Either<T, B> {
    return this.fold(
      (l) => <Either<T, B>>(<any>this),
      (r) => new Right(f(r))
    );
  }

  flatMap<B>(f: (U) => Either<T, B>): Either<T, B> {
    return this.fold(
      (l) => <Either<T, B>>(<any>this),
      (r) => f(r)
    );
  }

  map2<B, C>(b: Either<T, B>, f: (a: U, b: B) => C): Either<T, C> {
    return this.fold(
      (l) => <Either<T, C>>(<any>this),
      (r) => b.flatMap((bb) => new Right(f(r, bb)))
    );
  }
}

export class Left<T, U> extends Either<T, never> {
  constructor(private t: T) {
    super();
  }
  isRight(): boolean {
    return false;
  }
  fold<X>(l: (t: T) => X, r: any): X {
    return l(this.t);
  }
}

export class Right<T, U> extends Either<never, U> {
  constructor(private u: U) {
    super();
  }
  isRight(): boolean {
    return true;
  }
  fold<X>(_: any, r: (u: U) => X): X {
    return r(this.u);
  }
}
