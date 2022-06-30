import { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

const Wordle = ({ solution }) => {
    const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } = useWordle(solution);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);

        if (isCorrect) {
            setTimeout(() => {
                setShowModal(true);
            }, 2000);

            window.removeEventListener('keyup', handleKeyUp);
        }

        if (turn > 5) {
            setTimeout(() => {
                setShowModal(true);
            }, 2000);

            window.removeEventListener('keyup', handleKeyUp);
        }

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyUp, isCorrect, turn]);

    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            <Keypad usedKeys={usedKeys} />

            {showModal && <Modal turn={turn} isCorrect={isCorrect} solution={solution} />}
        </div>
    );
};
export default Wordle;
