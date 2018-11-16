import React from 'react';
import './instruction-styles.css';

export default () => {
    const instructions = [
        "This is a sample test to help you get familiar with the HackerRank test environment.",
        "One coding question provides input /output code stubs, and the other does not. You may encounter either situation in a real test.",
        "If you're expected to write the full code, it'd be mentioned in the code area.",
        "To understand more about the environment, time limits, etc. you can check our Environment page or read the FAQ.",
        "Do not close the browser window/tab before you submit your final answers. If you do so, we cannot guarantee that your work will be saved."
    ];

    const userInstructions = instructions.map(i => <li key={i}>{i}</li>);

    return (
        <div className="instructions">
            <h5>Instructions</h5>
            <ul>
                {userInstructions}
            </ul>
            <hr/>
        </div>
    );
}