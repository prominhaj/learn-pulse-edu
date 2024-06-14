import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ChangePassword = () => {
    return (
        <div>
            <h5 className='mb-4 text-lg font-semibold'>Change password</h5>
            <form>
                <div className='grid grid-cols-1 gap-5'>
                    <div>
                        <Label className='block mb-2'>Old password :</Label>
                        <Input type='password' placeholder='Old password' required='' />
                    </div>
                    <div>
                        <Label className='block mb-2'>New password :</Label>
                        <Input type='password' placeholder='New password' required='' />
                    </div>
                    <div>
                        <Label className='block mb-2'>Re-type New password :</Label>
                        <Input
                            type='password'
                            placeholder='Re-type New password'
                            required=''
                        />
                    </div>
                </div>
                {/*end grid*/}
                <Button className='mt-5' type='submit'>
                    Save password
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;