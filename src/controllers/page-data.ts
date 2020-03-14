export default interface PageData {
    meta?: {
        charset: string;
        description: string;
    };
    title?: string;
    staticBasePath?: string;
    quests?: object;
    tag?: string;
    scene?: object;
    startSceneId?: number;
}
