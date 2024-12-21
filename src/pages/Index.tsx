import { useState } from "react";
import { Board } from "@/components/Board";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Whiteboard } from "@/components/Whiteboard";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function Index() {
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">RoadMAP</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowWhiteboard(!showWhiteboard)}
            >
              <Pencil className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <Board />
      </main>

      {showWhiteboard && (
        <Whiteboard onClose={() => setShowWhiteboard(false)} />
      )}
    </div>
  );
}