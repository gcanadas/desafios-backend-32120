import HomePage from "../../homePage.tsx";
import { Context } from "../../deps.ts";

const colors: string[] = [];

export const home = (ctx: Context) => {
    ctx.response.status = 200;
    ctx.response.type = 'html';
    ctx.response.body = HomePage({  });
}

export const color = async (ctx: Context) => {
    const newColor = await ctx.request.body().value

    for (const val of newColor.entries()) {
        colors.push(val);
    }
    
    ctx.response.status = 200;
    ctx.response.type = 'html';
    ctx.response.body = HomePage({ colors });
}

export const notFound = (ctx: Context) => {
    ctx.response.status = 404;
    ctx.response.body = 'Not Found';
}