import './css/index.css'

function AdviceCard(props) {
    return (
        <div className="adviceCard" style={{borderLeft: `4px solid ${props.color}`}}>
            <p>{props.advice}</p>
        </div>
    );
}

export default AdviceCard;