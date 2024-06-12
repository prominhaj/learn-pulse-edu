import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function Profile() {
	return (
		<>
			<div className="p-6 bg-white rounded-md shadow dark:shadow-gray-800 dark:bg-slate-900">
				<h5 className="mb-4 text-lg font-semibold">Personal Detail :</h5>
				<form>
					<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
						<div>
							<Label className="block mb-2">
								First Name : <span className="text-red-600">*</span>
							</Label>
							<Input
								type="text"
								placeholder="First Name:"
								id="firstname"
								name="name"
								required
							/>
						</div>
						<div>
							<Label className="block mb-2">
								Last Name : <span className="text-red-600">*</span>
							</Label>
							<Input
								type="text"
								placeholder="Last Name:"
								name="name"
								required
							/>
						</div>
						<div>
							<Label className="block mb-2">
								Your Email : <span className="text-red-600">*</span>
							</Label>
							<Input
								type="email"
								placeholder="Email"
								name="email"
								required
							/>
						</div>
						<div>
							<Label className="block mb-2">Occupation :</Label>
							<Input
								name="name"
								id="occupation"
								type="text"
								placeholder="Occupation :"
							/>
						</div>
					</div>
					{/*end grid*/}
					<div className="grid grid-cols-1">
						<div className="mt-5">
							<Label className="block mb-2">Description :</Label>
							<Textarea
								id="comments"
								name="comments"
								placeholder="Message :"
							/>
						</div>
					</div>
					{/*end row*/}
					<Button className="mt-5" asChild>
						<input type="submit" name="send" value="Save Changes" />
					</Button>
				</form>
				{/*end form*/}
			</div>
			<div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
				<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
					<div>
						<h5 className="mb-4 text-lg font-semibold">Contact Info :</h5>
						<form>
							<div className="grid grid-cols-1 gap-5">
								<div>
									<Label className="block mb-2">Phone No. :</Label>
									<Input
										name="number"
										id="number"
										type="number"
										placeholder="Phone :"
									/>
								</div>
								<div>
									<Label className="block mb-2">Website :</Label>
									<Input
										name="url"
										id="url"
										type="url"
										placeholder="Url :"
									/>
								</div>
							</div>
							{/*end grid*/}
							<Button className="mt-5" type="submit">
								Add
							</Button>
						</form>
					</div>
					{/*end col*/}
					<div>
						<h5 className="mb-4 text-lg font-semibold">
							Change password :
						</h5>
						<form>
							<div className="grid grid-cols-1 gap-5">
								<div>
									<Label className="block mb-2">Old password :</Label>
									<Input
										type="password"
										placeholder="Old password"
										required=""
									/>
								</div>
								<div>
									<Label className="block mb-2">New password :</Label>
									<Input
										type="password"
										placeholder="New password"
										required=""
									/>
								</div>
								<div>
									<Label className="block mb-2">
										Re-type New password :
									</Label>
									<Input
										type="password"
										placeholder="Re-type New password"
										required=""
									/>
								</div>
							</div>
							{/*end grid*/}
							<Button className="mt-5" type="submit">
								Save password
							</Button>
						</form>
					</div>
					{/*end col*/}
				</div>
				{/*end row*/}
			</div>
		</>
	);
}

export default Profile;
