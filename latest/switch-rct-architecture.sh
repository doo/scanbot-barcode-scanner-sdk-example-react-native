#!/bin/bash
set -e;

# Define the path to the gradle.properties file
FILE_PATH="android/gradle.properties"

# Check if the file exists
if [ ! -e "$FILE_PATH" ]; then
    echo "File not found: $FILE_PATH"
    exit 1
fi

# Define the property and its values
PROPERTY="newArchEnabled"
TRUE_VALUE="true"
FALSE_VALUE="false"

# Check for command line arguments
if [ "$#" -eq 0 ]; then
    # No arguments provided; toggle the property value
    CURRENT_VALUE=$(grep -i "^$PROPERTY=" "$FILE_PATH" | cut -d'=' -f2)
    if [ "$CURRENT_VALUE" = "$TRUE_VALUE" ]; then
        NEW_VALUE="$FALSE_VALUE"
    else
        NEW_VALUE="$TRUE_VALUE"
    fi
elif [ "$#" -eq 1 ]; then
    # Check for the provided argument
    case "$1" in
        "--new")
            NEW_VALUE="$TRUE_VALUE"
            ;;
        "--old")
            NEW_VALUE="$FALSE_VALUE"
            ;;
        *)
            echo "Invalid argument: $1"
            echo "Usage: $0 [--new|--old]"
            exit 1
            ;;
    esac
else
    echo "Invalid number of arguments"
    echo "Usage: $0 [--new|--old]"
    exit 1
fi

# Debug info
echo "Setting NEW_ARCHITECTURE to $NEW_VALUE!"

# Replace the line in the file using a different delimiter
sed -i'.bak' "s/^$PROPERTY=.*/$PROPERTY=$NEW_VALUE/" "$FILE_PATH"
echo "Updated $PROPERTY to $NEW_VALUE in $FILE_PATH"

rm android/gradle.properties.bak

# Re-install iOS with the specified architecture
cd ios
if [ "$NEW_VALUE" = "$TRUE_VALUE" ]; then
    # bundle exec pod install --repo-update
    RCT_NEW_ARCH_ENABLED=1 pod install --repo-update
else
    pod install --repo-update
fi
cd ..
