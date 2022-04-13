import {
    RadarEntry,
    RadarQuadrant,
    RadarRing,
    TechRadarApi,
    TechRadarLoaderResponse,
} from '@backstage/plugin-tech-radar';
import jsonData from './test.json';

export class RadarApi implements TechRadarApi {
    async load(id: string| undefined): Promise<TechRadarLoaderResponse> {
        const data = jsonData.find(value=> value.id === id)!;
        const rings = new Array<RadarRing>();
        data.rings.forEach(value=>{
            rings.push({ id: value.toLowerCase(), name: value.toUpperCase(), color: '#93c47d' });
        })

        const quadrants = new Array<RadarQuadrant>();
        data.quadrants.forEach(value=>{
            quadrants.push({ id: value.toLowerCase(), name: value});
        })

        const entries = new Array<RadarEntry>();
        data.blips.forEach(value=>{
            entries.push( {
                timeline: [
                    {
                        moved: 0,
                        ringId: value.ring,
                        date: new Date('2020-08-06'),
                        description: value.description,
                    }
                ],
                url: '#',
                key: value.name.toLowerCase(),
                id: value.name.toLowerCase(),
                title: `${value.name} - ${jsonData.title}`,
                quadrant: value.quadrant.toLowerCase(),
                description: value.description,
            })
        })
        return {
            entries,
            quadrants,
            rings
        };
    }
}