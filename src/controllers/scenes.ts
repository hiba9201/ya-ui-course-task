import {Request, Response} from "express";
import Scene from 'models/scene';
import PageData from "./page-data";
import Action from "../models/action";
import Achievement from "../models/achievement";
import Adventure from "../models/adventure";

export function sceneById(req: Request, res: Response): void {
    const {meta, staticBasePath, title} = req.locals;


    Scene.findByPk(Number(req.params.id), {
        attributes: ['image', 'description', 'adventureId', 'angle'],
        include: [
            {
                model: Action,
                attributes: ['text', 'nextSceneId']
            },
            {
                model: Achievement,
                attributes: ['image', 'description']
            }
        ]

    })
        .then(result => {
            Adventure.findByPk(Number(result?.adventureId), {
                attributes: ['startScene']
            })
                .then(quest => {
                    const data: PageData = {
                        meta,
                        staticBasePath,
                        title,
                        scene: result || {},
                        startSceneId: quest?.startScene || 1
                    };

                    res.render('scene', data);
                })
        });
}
