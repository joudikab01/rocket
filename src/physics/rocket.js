import { Vector3 } from "three";
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
        engineType
        //,numberOfEngines
    ) {
        this.position = position;
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
    atmosphere = new Atmosphere(position.z);
    weight(altitude, mass) {
        return THREE.Vector3(0, -(mass * 6.673 * 5.98 * Math.pow(10, 13)) / (altitude * altitude), 0);

    }

    drag(density, velocity) {
        let velocitySquere = velocity.squereMagnitude();
        let normalize = velocity.normalize();
        let drag = new THREE.Vector3(
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
        let lift_coeff =
            -0.05 +
            Math.sqrt(
                0.0025 +
                (0.36 * this.raduis * this.angular_velocity.getMagnitude()) /
                this.velocity.getMagnitude()
            ); // cl=r*ω/v

        let velocitySquere = this.velocity.squereMagnitude();

        let cross = this.rotateAxes.cross(this.velocity);

        let lift = new THREE.Vector3(
            ((velocitySquere * 1) / 2) * lift_coeff * density * this.area * cross.getX(),
            ((-velocitySquere * 1) / 2) * lift_coeff * density * this.area * cross.getY(),
            ((velocitySquere * 1) / 2) * lift_coeff * density * this.area * cross.getZ()
        );
        return lift;
    }

    thrust(massfr, exhaustVelocity, angle) {
        thrustMagnitude = massfr * exhaustVelocity + (this.exhaustPressure - atmosphere.getPressure()) * this.exhaustArea;
        let thrust = THREE.Vector3(
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

}
export default Rocket;