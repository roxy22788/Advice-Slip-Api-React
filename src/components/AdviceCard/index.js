import colors from './data/colors.js'
import './css/index.css'


function AdviceCard(props) {
    function randomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    return (
        <div className="adviceCard" style={{borderLeft: `4px solid ${randomColor()}`}}>
            <p>{props.advice}</p>
        </div>
    );
}

export default AdviceCard;