import {
    AnimationOptions,
    type IAnimatable,
    type IOptionLoader,
    OptionsColor,
    type RangeValue,
    type RecursivePartial,
    isNull,
    setRangeValue,
} from "@tsparticles/engine";
import type { IOrbit } from "../Interfaces/IOrbit.js";
import { OrbitRotation } from "./OrbitRotation.js";

/**
 * [[include:Options/Particles/Orbit.md]]
 */
export class Orbit implements IOrbit, IOptionLoader<IOrbit>, IAnimatable<AnimationOptions> {
    animation;
    color?: OptionsColor;
    enable: boolean;
    opacity: RangeValue;
    radius?: RangeValue;
    rotation;
    width: RangeValue;

    constructor() {
        this.animation = new AnimationOptions();
        this.enable = false;
        this.opacity = 1;
        this.rotation = new OrbitRotation();
        this.width = 1;
    }

    load(data?: RecursivePartial<IOrbit>): void {
        if (isNull(data)) {
            return;
        }

        this.animation.load(data.animation);

        this.rotation.load(data.rotation);

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.opacity !== undefined) {
            this.opacity = setRangeValue(data.opacity);
        }
        if (data.width !== undefined) {
            this.width = setRangeValue(data.width);
        }
        if (data.radius !== undefined) {
            this.radius = setRangeValue(data.radius);
        }
        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
    }
}
