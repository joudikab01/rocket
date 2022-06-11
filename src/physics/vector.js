import { normalize } from "gsap/gsap-core";
import { Vector3 } from 'three'

class Vector extends Vector3 {
    constructor(x, y, z) {
        super(x, y, z);
    }

    // create: function (x, y, z) {
    //     var object = Object.create(this);
    //     object.setX(x);
    //     object.setY(y);
    //     object.setZ(z);
    //     return object;
    // },

    /*
    set coordiantes
    */
    // setX: function (value) {
    //     this._x = value;
    // },
    // setY: function (value) {
    //     this._y = value;
    // },
    // setZ: function (value) {
    //     this._z = value;
    // },
    /*
    set angles 
    */
    // setAngleXY (value) {

    // }
    // setAngleXZ (value) {

    // }
    // setAngleYZ(value) {

    // }

    /*
    get coordiantes
    */
    // getX: function () {
    //     return this._x;
    // },
    // getY: function () {
    //     return this._y;
    // },
    // getZ: function () {
    //     return this._z;
    // },

    /*
   get angles 
   */
    getAngleXY() {
        return Math.atan2(this.y / this.x, 0);

    }
    getAngleXZ() {
        return Math.atan2(this.z / this.x, 0);


    }
    getAngleYZ() {
        return Math.atan(this.z / this.y, 0);

    }

    /*
    add vectors
    */
    // add: function (vector) {
    //     return vector.create(
    //         this._x + vector.getX(),
    //         this._y + vector.getY(),
    //         this._z + vector.getZ(),
    //     );
    // },
    /*
    subtract vectors
    */
    // subtract: function (vector) {
    //     return vector.create(
    //         this._x - vector.getX(),
    //         this._y - vector.getY(),
    //         this._z - vector.getZ(),
    //     );
    // },
    /*
   multiply a vector by a scalar
   */
    // multiplyScalar: function (scalar) {
    //     return vector.create(
    //         this._x * scalar,
    //         this._y * scalar,
    //         this._z * scalar,
    //     );
    // },
    /*
   divide a vector by a scalar
   */
    // divideScalar: function (scalar) {
    //     return vector.create(
    //         this._x / scalar,
    //         this._y / scalar,
    //         this._z / scalar,
    //     );
    // },
    /*
    vector magnitude or length
    */
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /*
    normalize a vector 
    */
    // normalize: function () {
    //     if (this.getMagnitude() > 1) {
    //         return vector.create(
    //             this._x / this.getMagnitude(),
    //             this._y / this.getMagnitude(),
    //             this._z / this.getMagnitude(),
    //         );
    //     }

    // },
    /*
    distance between two vectors 
    */
    // distance2Vectors: function (vector) {
    //     return Math.sqrt(
    //         (vector.getX() - this._x) * (vector.getX() - this._x)
    //         + (vector.getY() - this._y) * (vector.getY() - this._y)
    //         + (vector.getZ() - this._z) * (vector.getZ() - this._z)
    //     );
    // },
    /*
    vectors dot product
    */
    // multiplyVector: function (vector) {
    //     return this._x * vector.getX() +
    //         this._y * vector.getY() +
    //         this._z * vector.getZ();

    // },
    /*
    vector projection
    */
    /*
    vector cross product
    */
    // crossProduct: function (vector) {
    //     return vector.create(
    //         this._z * vector.getY() - this._y * vector.getZ(),
    //         this._z * vector.getX() - this._x * vector.getZ(),
    //         this._y * vector.getX() - this._x * vector.getY()
    //     );
    // },
    /*
    invert vector
    */
    // invert: function () {
    //     return vector.create(
    //         -1 * this._x,
    //         -1 * this._y,
    //         -1 * this._z
    //     );
    // },
    /*
    square the magnitude
    */
    squareMagnitude() {
        this.x * this.x + this.y * this.y + this.z * this.z
    }

} 
//export default Vector;