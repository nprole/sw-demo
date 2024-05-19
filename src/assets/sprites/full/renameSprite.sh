#!/bin/bash

# Initialize the counter
counter=1

# Loop through each .webp file in the current directory
for file in *.webp; do
  # Extract the file extension
  extension="${file##*.}"
  
  # Construct the new file name
  new_name="example_${counter}.${extension}"
  
  # Rename the file
  mv "$file" "$new_name"
  
  # Increment the counter
  ((counter++))
done

echo "Files have been renamed successfully."