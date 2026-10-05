import {inngest} from "../client.js";
import { fetchRepoFiles } from "../../service/github.js";
import {chunkFiles} from '../../service/chunker.js';
import {saveChunks} from '../../service/vectorStore.js'


export const indexRepo = inngest.createFunction(
    {id: "index-repo", triggers:[{event:"repo/index.requested"}]},
    async ({event, step})=>{       //jobs threy provide
        
    }
)