import type { Container, Engine, IPlugin, Options, RecursivePartial } from "tsparticles-engine";
import { CanvasMask } from "./Options/Classes/CanvasMask";
import { CanvasMaskInstance } from "./CanvasMaskInstance";
import type { CanvasMaskOptions } from "./types";

/**
 * @category Canvas Mask Plugin
 */
class CanvasMaskPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "canvasMask";

        this._engine = engine;
    }

    getPlugin(container: Container): CanvasMaskInstance {
        return new CanvasMaskInstance(container, this._engine);
    }

    loadOptions(options: Options, source?: RecursivePartial<CanvasMaskOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        const optionsCast = options as unknown as CanvasMaskOptions;
        let imageOptions = optionsCast.image as CanvasMask;

        if (imageOptions?.load === undefined) {
            optionsCast.image = imageOptions = new CanvasMask();
        }

        imageOptions.load(source?.image);
    }

    needsPlugin(options?: RecursivePartial<CanvasMaskOptions>): boolean {
        return options?.image?.enable ?? false;
    }
}

export async function loadCanvasMaskPlugin(engine: Engine): Promise<void> {
    const plugin = new CanvasMaskPlugin(engine);

    await engine.addPlugin(plugin);
}
