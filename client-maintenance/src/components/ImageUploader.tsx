import React, { useState } from 'react';
import { Avatar, Box } from '@mui/material';

interface ImageUploaderProps {
    onImageChange: (base64String: string) => void;
    imagePreview?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, imagePreview }) => {
    const [image, setImage] = useState<string | null>(imagePreview || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result?.toString();
                setImage(base64String ?? "");
                onImageChange(base64String ?? "");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box>
            <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
                id="image-upload"
            />
            <label htmlFor="image-upload">
                <Avatar
                    src={image ?? ""}
                    sx={{ width: 100, height: 100, cursor: 'pointer' }}
                />
            </label>
        </Box>
    );
};

export default ImageUploader;