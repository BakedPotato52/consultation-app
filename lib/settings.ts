type RouteAccessMap = {
    [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/patient(.*)": ["patient"],
    "/psycaitrist(.*)": ["psycaitrist"],

};