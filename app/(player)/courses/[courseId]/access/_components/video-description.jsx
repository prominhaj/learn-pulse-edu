"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizModal from "./quiz-modal";


const quizes = [
	{
		id: "quiz-1",
		title: "Quiz title 1",
		description: "Quiz description",
		options: [
			{ label: "Option-1", id: 1, isCorrect: true },
			{ label: "Option-2", id: 2, isCorrect: false },
			{ label: "Option-3", id: 3, isCorrect: false },
			{ label: "Option-4", id: 4, isCorrect: true },
		],
	},
	{
		id: "quiz-2",
		title: "Quiz title 2",
		description: "Quiz description",
		options: [
			{ label: "Quiz-2 Option-1", id: 1, isCorrect: true },
			{ label: "Quiz-2 Option-2", id: 2, isCorrect: false },
			{ label: "Quiz-2 Option-3", id: 3, isCorrect: false },
			{ label: "Quiz-2 Option-4", id: 4, isCorrect: true },
		],
	},
];

const VideoDescription = ({ description }) => {
	return (
		<div className="mt-2 md:mt-4">
			<Tabs defaultValue="details">
				<TabsList className="justify-start w-full h-auto p-0 bg-transparent border-b rounded-none border-border">
					<TabsTrigger className="capitalize rounded-none data-[state=active]:border-blue-500 border-b-2 border-transparent pb-2" value="details">
						Description
					</TabsTrigger>
					<TabsTrigger className="capitalize rounded-none data-[state=active]:border-blue-500 border-b-2 border-transparent pb-2" value="quiz">
						Quiz
					</TabsTrigger>
				</TabsList>
				<div className="pt-3">
					<TabsContent value="details">
						<div>
							{
								description ? (
									<p className="text-primary">
										{description}
									</p>
								) : (
									<p className="text-muted-foreground">
										No description
									</p>
								)
							}
						</div>
					</TabsContent>
					<TabsContent value="quiz">
						<p className="mb-4">Quiz notes</p>
						<QuizModal quizes={quizes} />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}

export default VideoDescription;
