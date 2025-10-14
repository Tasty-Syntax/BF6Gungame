class Vector3 {
  constructor(private _x: number, private _y: number, private _z: number) {}

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }

  static zero() {
    return new Vector3(0, 0, 0);
  }

  clone() {
    return new Vector3(this._x, this._y, this._z);
  }

  toModVector(invertParameters = false): mod.Vector {
    if (invertParameters) {
      return mod.CreateVector(this._x * -1, this._y * -1, this._z * -1);
    } else {
      return mod.CreateVector(this._x, this._y, this._z);
    }
  }
}
