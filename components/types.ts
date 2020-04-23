export interface QuestProps {
    id?: number;
    options?: ObserverOptions;
    startScene: string;
    image: string | null;
    name: string;
    description: string;
    tags: Array<Tag>;
}

interface ObserverOptions {
    threshold?: number | number[];
    onChange: (entry: IntersectionObserverEntry, unobserve: () => void) => void;
}

export interface Tag {
    id: number;
    engName: string;
    name: string;
}

export interface TagsProps {
    tags: Array<Tag>;
}

export interface SceneProps {
    id: string;
}

export interface AchievementData {
    id: number;
    image: string;
    description: string;
}

export interface ActionData {
    id: number;
    text: string;
    nextSceneId: number;
}

interface SceneData {
    image: string;
    description: string;
    adventureId: number;
    angle: string;
    achievements: Array<AchievementData>;
    actions: Array<ActionData>;
}

export class SceneJson {
    scene: SceneData;
    startSceneId: number;
}
