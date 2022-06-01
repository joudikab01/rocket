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
        massFlowRate,
        dragCoefficient,
        exhaustSpeed,
        exhaustArea,
        exhaustPressure
        //,numberOfEngines
    ) {
        this.position = position;
        this.seaLevelThrustPerEngine = seaLevelThrustPerEngine;
        this.vacuumThrustPerEngine = vacuumThrustPerEngine;
        this.rocketDiameter = rocketDiameter;
        this.initialMass = initialMass;
        this.burnTime = burnTime;
        this.atmosphere = atmosphere;
        this.massFlowRate = massFlowRate;
        this.dragCoefficient = dragCoefficient;
        this.exhaustSpeed = exhaustSpeed;
        this.area = 0.25 * Math.PI * rocketDiameter * rocketDiameter;
        this.exhaustArea = exhaustArea;
        this.exhaustPressure = exhaustPressure;
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

    thrust(mass, exhaustVelocity, angle) {
        thrustMagnitude = mass * exhaustVelocity + (this.exhaustPressure - atmosphere.getPressure()) * this.exhaustArea;
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

}
export default Rocket;