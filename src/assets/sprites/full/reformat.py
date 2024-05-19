from PIL import Image
import os

# Directory containing the .webp files
directory = 'C:/Development/Sprites/full_sprites'  # Update this path

# Loop through each file in the directory
for filename in os.listdir(directory):
    if filename.endswith('.webp'):
        # Open the .webp file
        img = Image.open(os.path.join(directory, filename))
        
        # Remove the .webp extension and replace it with .png
        new_filename = filename.replace('.webp', '.png')
        
        # Save the image in .png format
        img.save(os.path.join(directory, new_filename), 'png')
        
        print(f'Converted {filename} to {new_filename}')

print('Conversion complete.')
