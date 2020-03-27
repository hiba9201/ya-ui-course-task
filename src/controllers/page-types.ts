// base interface
export interface PageData {
    meta?: {
        charset: string;
        description: string;
    };
    title?: string;
    staticBasePath?: string;
}

// quests interfaces
export interface QuestsPageData extends PageData {
    quests?: object;
}

export interface QuestsWithTagPageData extends QuestsPageData {
    tag?: string;
}

// scene interface
export interface ScenePageData extends PageData {
    scene?: object;
    startSceneId?: number;
}
