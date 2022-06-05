import atmosphere from "./atmosphere";
import vector from "./vector";


class Rocket {
    constructor(
        position,
        seaLevelThrustPerEngine,
        vacuumThrustPerEngine,
        rocketDiameter,
        initialMass,
        burnTime,
        atmosphere,
        dragCoefficient,
        exhaustSpeed,
        exhaustArea,
        exhaustPressure,
        engineType,
        liftCoeff
        //,numberOfEngines
    ) {
        this.position = position;
        this.liftCoeff = liftCoeff;
        this.seaLevelThrustPerEngine = seaLevelThrustPerEngine;
        this.vacuumThrustPerEngine = vacuumThrustPerEngine;
        this.rocketDiameter = rocketDiameter;
        this.initialMass = initialMass;
        this.burnTime = burnTime;
        this.atmosphere = atmosphere;
        this.dragCoefficient = dragCoefficient;
        this.exhaustSpeed = exhaustSpeed;
        this.area = 0.25 * Math.PI * rocketDiameter * rocketDiameter;
        this.exhaustArea = exhaustArea;
        this.exhaustPressure = exhaustPressure;
        this.engineType = engineType;
        if (this.engineType == 'F-1') {
            this.p0 = 7000000;
            this.at = 0.672;
            this.ro = 5.2492;
            this.gamma = 1.1507;
            this.r4 = 8314;
            this.mw = 22.186;
            this.t0 = 3558.34;
            this.r = this.r4 / this.mw;
        }
        //this.velocity = speed ;
        //this.numberOfEngines=numberOfEngines

    }
    atmosphere = new atmosphere(position.z);
    // weight(altitude, mass) {
    //     let w = -1 * (mass * 6.673 * 5.98 * Math.pow(10, 13)) / (altitude * altitude);
    //     return vector(0, w, 0);

    // }
    weight(mass, mesh) {
        let gravity = new THREE.Vector3(
            mesh.position.x,
            mesh.position.y + 6371000,
            mesh.position.z

        );
        let altitude = Math.sqrt(gravity.x * gravity.x + gravity.y * gravity.y + gravity.z * gravity.z)
        gravity.normalize();

        return gravity.multiplyScalar(6.673 * 5.972 * (1e13) * mass / (altitude * altitude));

    }

    drag(density, velocity) {
        let velocitySquere = velocity.squereMagnitude();
        let normalize = velocity.normalize();
        let drag = new vector(
            ((velocitySquere * -1) / 2) *
            this.drag_coeff *
            density *
            this.area *
            normalize.getX(),
            ((velocitySquere * -1) / 2) *
            this.drag_coeff *
            density *
            this.area *
            normalize.getY(),
            ((velocitySquere * -1) / 2) *
            this.drag_coeff *
            density *
            this.area *
            normalize.getZ()
        );
        return drag;
    }


    lift(density) {
        let velocitySquere = this.velocity.squereMagnitude();
        let cross = this.rotateAxes.cross(this.velocity);
        let lift = new vector(
            ((velocitySquere * 1) / 2) * liftCoeff * density * this.area * cross.getX(),
            ((-velocitySquere * 1) / 2) * liftCoeff * density * this.area * cross.getY(),
            ((velocitySquere * 1) / 2) * liftCoeff * density * this.area * cross.getZ()
        );
        return lift;
    }

    thrust(massfr, exhaustVelocity, angle) {
        thrustMagnitude = massfr * exhaustVelocity + (this.exhaustPressure - atmosphere.getPressure()) * this.exhaustArea;
        let thrust = vector(
            Math.cos(angle) * thrustMagnitude,
            Math.sin(angle) * thrustMagnitude,
            0
        );
        return thrust;
    }
    total(thrust, drag, lift, weight) {
        totalForce = drag.add(thrust);
        totalForce.add(lift);
        totalForce.add(weight);
        return totalForce;
    }
    massFlowRate() {
        massfr =
            this.p0 *
            this.at *
            Math.sqrt(this.gamma / (this.t0 * this.r)
                * Math.pow(2 / this.gamma + 1,
                    (this.gamma + 1) / (this.gamma - 1)));
        return massfr;
    }
    exhaustVelocity(gasPressure) {
        ve = Math.sqrt(
            this.t0 *
            this.r *
            2 * this.gamma *
            (1 -
                Math.pow(
                    this.exhaustPressure / gasPressure,
                    (this.gamma - 1) / this.gamma)
            ) / (this.mw * (gamma - 1))
        );
        return ve;
    }

}
export default Rocket;