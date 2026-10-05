import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

const embeddings = new OpenAIEmbeddings({model: "text-embedding-3-small"});
const pinecone = new Pinecone();


function getIndex(){
    return pinecone.Index(process.env.PINECONE_INDEX || "git-wiki")
}

export async function saveChunks(repo, documents) {
    const namespace  = repo.replace("/","-");

    await pinecone.fromDocuments(documents, embeddings, {
        pineconeIndex: getIndex(),
        namespace,
        
    })
}