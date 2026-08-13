import { useState } from "react";
import Button from "../../components/Button";
import Modal from "./Modal";

type MenuBarProps = {
  onRestart: () => void;
  onNewGame: () => void;
};

function MenuBar({ onRestart, onNewGame }: MenuBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex w-full items-center justify-between">
      <h1 className="text-preset-7 text-blue-950 md:text-preset-4">memory</h1>
      <div className="hidden items-center gap-4 md:flex">
        <Button
          variant="primary"
          className="w-[127px] px-0"
          onClick={onRestart}
        >
          Restart
        </Button>
        <Button
          variant="secondary"
          className="w-[149px] px-0"
          onClick={onNewGame}
        >
          New Game
        </Button>
      </div>

      <Button
        size="sm"
        className="w-[78px] px-0 md:hidden"
        onClick={() => setMenuOpen(true)}
      >
        Menu
      </Button>
      <Modal open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="flex w-[327px] max-w-full flex-col gap-4 p-6">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              setMenuOpen(false);
              onRestart();
            }}
          >
            Restart
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              setMenuOpen(false);
              onNewGame();
            }}
          >
            New Game
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setMenuOpen(false)}
          >
            Resume Game
          </Button>
        </div>
      </Modal>
    </header>
  );
}

export default MenuBar;
