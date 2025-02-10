import { List, StickyNote, UserRound } from "lucide-react";
import CountCard from "./components/CountCard";

export default function Page(){
    return (
        <main className="p-10">
            <div className="flex gap-4">
                <CountCard name={'Posts'} path={'posts'} icon={<StickyNote/>} />
                <CountCard name={'Authors'} path={'authors'} icon={<UserRound />} />
                <CountCard name={'Categories'} path={'categories'} icon={<List/>} />
            </div>
        </main>
    )
}