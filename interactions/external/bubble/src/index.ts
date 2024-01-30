import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalBubbleInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalBubble",
        async (container) => {
            const { Bubbler } = await import("./Bubbler.js");

            return new Bubbler(container);
        },
        refresh,
    );
}

export * from "./Options/Classes/BubbleBase.js";
export * from "./Options/Classes/BubbleDiv.js";
export * from "./Options/Classes/Bubble.js";
export * from "./Options/Interfaces/IBubbleBase.js";
export * from "./Options/Interfaces/IBubbleDiv.js";
export * from "./Options/Interfaces/IBubble.js";
