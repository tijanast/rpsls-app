import robotAvatar from "../assets/robot-avatar.png";

interface RobotCardProps {
  robotMove: string;
}

export default function RobotCard({ robotMove }: RobotCardProps) {
    console.log(robotMove);
  return (
    <div className="robot-card">
      <img src={robotAvatar} alt="Robot" className="avatar" />
      <p className="robot-name">RoboBot</p>
      {robotMove && <p className="robot-move">Move: {robotMove}</p>}
    </div>
  );
}
