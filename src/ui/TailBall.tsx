interface TailBallProps {
  n : number
}
export default function TailBall({n}:TailBallProps) {
  const bg = [
    "bg-red-200", "bg-amber-200", "bg-lime-200" , 
    "bg-sky-200", "bg-purple-200"
  ]
  return (
    <div className={`w-20 h-20 rounded-full
                    flex justify-center items-center
                    text-2xl font-bold m-2
                    ${bg[Math.floor(n / 10)]}`}>
      {n}
    </div>
  )
}