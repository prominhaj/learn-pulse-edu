"use client";

const ChangeProfilePhoto = () => {
    return (
        <>
            <input
                id='pro-img'
                name='profile-image'
                type='file'
                className='hidden'
                onchange='loadFile(event)'
            />
        </>
    );
};

export default ChangeProfilePhoto;