import Atmosphere from "./atmosphere";
//import vector from "./vector";
 import * as THREE from 'three'
import Parameters from "../script.js";
import { Vector3,Mesh } from "three";
//const {Parameters} = require('../script.js');
class Rocket {
    constructor(
        mesh,
        rocketDiameter,

        rocket_mass,
        fuel_mass,
        //total_mass,
        mass_flow_rate,

        burnTime,
        //atmosphere,
        dragCoefficient,

        //exhaust_Velocity,
        exhaust_Area,
        exhaust_Pressure,

        engineType,
        liftCoeff,

        //launch_altitude,
        altitude,

        //acceleration,
        //velocity,
        thrustMagnitude,

        //total_force
        //,numberOfEngines
    ) {
       
        this.scale=0.000005;
        this.mesh = mesh;
        this.liftCoeff = liftCoeff;             
        this.rocketDiameter = rocketDiameter;
       
        this.burnTime = burnTime;
        
        this.dragCoefficient = dragCoefficient;
        
        //this.area = 0.25 * Math.PI * rocketDiameter * rocketDiameter;
        this.engineType = engineType;
        this.launch_altitude=altitude;
        this.altitude=altitude;

        this.exhaust_Velocity;
        this.exhaust_Area=exhaust_Area;
        this.exhaust_Pressure=exhaust_Pressure;

        this.velocity=new Vector3(0,0,0)
        this.acceleration= new Vector3(0,0,0);
        this.thrustMagnitude=thrustMagnitude;

        this.rocket_mass=rocket_mass;
        this.fuel_mass=fuel_mass;
        this.total_mass=this.rocket_mass+this.fuel_mass;
        this.mass_flow_rate=mass_flow_rate;
        this.wvector=new Vector3(0,0,0);
        this.lvector=new Vector3(0,0,0);
        this.tvector=new Vector3(0,0,0);;
        this.dvector=new Vector3(0,0,0);
        this.total_force= new Vector3(0,0,0);
        
        this.atmosphere = new Atmosphere(this.altitude);
    
    }

    check_engine(type){
       // type ==1 refrenced for engine f-1 
        if (type == 1) {
            this.p0 = 7000000;
            this.at = 0.672;
            this.ro = 5.2492;
            this.gamma = 1.1507;
            this.r4 = 8314;
            this.mw = 22.186;
            this.t0 = 3558.34;
            this.r = this.r4 / this.mw;
        }

    }
   
rocketArea(){
    return 0.25 * Math.PI * this.rocketDiameter * this.rocketDiameter;
}
    massFlowRate() {
        //console.log(this.r)
        this.mass_flow_rate=
            this.scale*
             this.p0 *
             this.at *
             Math.sqrt( this.gamma / (this.t0 * this.r)
                 * Math.pow(2 / (this.gamma + 1),
                     ((this.gamma + 1) / (this.gamma - 1))  )) ; 
        
                     //console.log(this.massFlowRate())
        return this.mass_flow_rate
         
     }


     exhaustVelocity() { 
           this.exhaust_Velocity =this.scale* Math.sqrt(
               this.t0 *
               this.r *
               2 * this.gamma *
               (1 -
                   Math.pow(
                       this.exhaust_Pressure / this.p0,
                       (this.gamma - 1) / this.gamma)
               ) / (this.mw * (this.gamma - 1))
           );
           return this.exhaust_Velocity;
       }



    weight() {
        let gravity = new Vector3(
            this.mesh.position.x,
            this.mesh.position.y + 6371000,
            this.mesh.position.z

        );
        let k = gravity.length(); 
        
        this.altitude=k-6371000;
        //Math.sqrt(gravity.x * gravity.x + gravity.y * gravity.y + gravity.z * gravity.z)
        gravity.normalize();

        this.atmosphere.updateConditions(0);

        return this.wvector=gravity.multiplyScalar(this.scale*-1*6.673 * 5.972 * (1e13) * this.total_mass / (k * k));

    }

     

    drag() {
        this.dvector.setX(this.velocity.clone().normalize().x)
        this.dvector.setY(this.velocity.clone().normalize().y)
        this.dvector.setZ(this.velocity.clone().normalize().z)
        this.dvector.multiplyScalar(
            ((this.velocity.lengthSq() * -1) / 2) *
            this.dragCoefficient *
            this.atmosphere.density *
            this.rocketArea())
        
        return this.dvector;
    }


    lift() {
        this.lvector.setX(this.velocity.clone().normalize().x)
        this.lvector.setY(this.velocity.clone().normalize().y)
        this.lvector.setZ(this.velocity.clone().normalize().z)
        this.lvector.multiplyScalar(
            ((this.velocity.lengthSq() * -1) / 2) *
            this.liftCoeff *
            this.atmosphere.density *
            this.rocketArea())
        this.lvector.applyAxisAngle(this.velocity,Math.PI/2)    
        return this.lvector;
    }

    thrust() {
        if(this.fuel_mass==0) return new Vector3(0,0,0)
        this.thrustMagnitude = this.massFlowRate() * this.exhaustVelocity() 
        + (this.scale*this.exhaust_Pressure - this.scale*this.atmosphere.getPressure()) 
        *-1* this.exhaust_Area;
        let force_angle=Math.PI/2;
        //Math.atan2(this.total_force.y / this.total_force.x, 0)
        this.tvector = new Vector3(
            Math.cos(force_angle) * this.thrustMagnitude,
            Math.sin(force_angle) * this.thrustMagnitude,
            0
        );
        return this.tvector;
    }


    total() {
        this.total_force= this.weight().clone().add(this.thrust());
        this.total_force.add(this.lift())
          this.total_force.add(this.drag())
        return this.total_force;
    }

    new_acceleration(){
      return this.acceleration=this.total().multiplyScalar(1/this.total_mass)
    }
     
    new_velocity(delta_time){
        this.velocity.add(this.new_acceleration().clone().multiplyScalar(delta_time))
         return this.velocity;
    }

    new_position(delta_time){
      this.mesh.position.add(this.velocity.clone().multiplyScalar(delta_time));
       //this.fuel_mass-= this.massFlowRate() * delta_time;
        // this.mesh.x+=this.velocity.clone().x*(delta_time)
        // this.mesh.y+=this.velocity.clone().y*(delta_time)
        // this.mesh.z+=this.velocity.clone().z*(delta_time)
    }  

}
export default Rocket;