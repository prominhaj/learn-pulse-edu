import { Button } from "@/components/ui/button";
import { VideoPlayer } from "./_components/video-player";
// import { Separator } from "@/components/ui/separator";
import VideoDescription from "./_components/video-description";

const Course = () => {
	return (
		<div>
			<div className="flex flex-col max-w-4xl pb-20 mx-auto">
				<div className="w-full p-4">
					<VideoPlayer />
				</div>
				<div>
					<div className="flex flex-col items-center justify-between p-4 md:flex-row">
						<h2 className="mb-2 text-2xl font-semibold">Introduction</h2>
						<Button size="lg">Enroll</Button>
					</div>
					{/* <Separator /> */}
					<VideoDescription />
				</div>
			</div>
		</div>
	);
};
export default Course;
