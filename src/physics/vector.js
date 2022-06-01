import { normalize } from "gsap/gsap-core";

var vector = {
    _x: 0,
    _y: 0,
    _z: 0,

    create: function (x, y, z) {
        var object = Object.create(this);
        object.setX(x);
        object.setY(y);
        object.setZ(z);
        return object;
    },

    /*
    set coordiantes
    */
    setX: function (value) {
        this._x = value;
    },
    setY: function (value) {
        this._y = value;
    },
    setZ: function (value) {
        this._z = value;
    },
    /*
    set angles 
    */
    setAngleXY: function (value) {

    },
    setAngleXZ: function (value) {

    },
    setAngleYZ: function (value) {

    },

    /*
    get coordiantes
    */
    getX: function () {
        return this._x;
    },
    getY: function () {
        return this._y;
    },
    getZ: function () {
        return this._z;
    },

    /*
   get angles 
   */
    getAngleXY: function () {
        return Math.atan2(this._y / this._x, 0);

    },
    getAngleXZ: function () {
        return Math.atan2(this._z / this._x, 0);


    },
    getAngleYZ: function () {
        return Math.atan(this._z / this._y, 0);

    },

    /*
    add vectors
    */
    add: function (vector) {
        return vector.create(
            this._x + vector.getX(),
            this._y + vector.getY(),
            this._z + vector.getZ(),
        );
    },
    /*
    subtract vectors
    */
    subtract: function (vector) {
        return vector.create(
            this._x - vector.getX(),
            this._y - vector.getY(),
            this._z - vector.getZ(),
        );
    },
    /*
   multiply a vector by a scalar
   */
    multiplyScalar: function (scalar) {
        return vector.create(
            this._x * scalar,
            this._y * scalar,
            this._z * scalar,
        );
    },
    /*
   divide a vector by a scalar
   */
    divideScalar: function (scalar) {
        return vector.create(
            this._x / scalar,
            this._y / scalar,
            this._z / scalar,
        );
    },
    /*
    vector magnitude or length
    */
    getMagnitude: function () {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    },
    /*
    normalize a vector 
    */
    normalize: function () {
        if (this.getMagnitude() > 1) {
            return vector.create(
                this._x / this.getMagnitude(),
                this._y / this.getMagnitude(),
                this._z / this.getMagnitude(),
            );
        }

    },
    /*
    distance between two vectors 
    */
    distance2Vectors: function (vector) {
        return Math.sqrt(
            (vector.getX() - this._x) * (vector.getX() - this._x)
            + (vector.getY() - this._y) * (vector.getY() - this._y)
            + (vector.getZ() - this._z) * (vector.getZ() - this._z)
        );
    },
    /*
    vectors dot product
    */
    multiplyVector: function (vector) {
        return this._x * vector.getX() +
            this._y * vector.getY() +
            this._z * vector.getZ();

    },
    /*
    vector projection
    */
    /*
    vector cross product
    */
    crossProduct: function (vector) {
        return vector.create(
            this._z * vector.getY() - this._y * vector.getZ(),
            this._z * vector.getX() - this._x * vector.getZ(),
            this._y * vector.getX() - this._x * vector.getY()
        );
    },
    /*
    invert vector
    */
    invert: function () {
        return vector.create(
            -1 * this._x,
            -1 * this._y,
            -1 * this._z
        );
    },
    /*
    square the magnitude
    */
    squareMagnitude: function () {
        this._x * this._x + this._y * this._y + this._z * this._z
    },

};