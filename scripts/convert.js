const fs = require('fs');

function extractContentsFromTextFile(filePath) {
    /**
     * Extracts formula names, handling BOM and various whitespace issues.
     */
    const extractedData = [];
    let currentItem = null;

    try {
        let fileContent = fs.readFileSync(filePath, 'utf-8');

        // BOM removal (at the very beginning of the file content string)
        if (fileContent.charCodeAt(0) === 0xFEFF) { // Check for BOM
            fileContent = fileContent.substring(1); // Remove BOM if present
            console.log("BOM character removed from file content."); // Debugging BOM removal
        }


        const lines = fileContent.split('\n');

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (!trimmedLine) {
                continue;
            }

            // Regex for formula names (lines that are not empty) - REVERTED to formula name extraction regex
            const match = trimmedLine.match(/^(.+)$/); // Capture the whole non-empty line


            if (match) {
                if (currentItem) {
                    extractedData.push(currentItem);
                }
                const name = match[1].trim();
                currentItem = { name: name, trans: [] };
            }
            // We are still not adding to trans as per request

        }

        if (currentItem) {
            extractedData.push(currentItem);
        }

        return JSON.stringify(extractedData, null, 4);

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Error: File not found at path: {filePath}`);
        } else {
            console.error(`An error occurred: ${error}`);
        }
        return null;
    }
}

if (require.main === module) {
    // const filePath = "桂林古本伤寒杂病论·简体.txt"; // Use your file name
    // const filePath = "伤寒杂病论·桂林古本·繁体.txt"; // Use your file name
    const filePath = "伤寒论背诵条文-宋.txt"; // Use your file name

    const jsonOutput = extractContentsFromTextFile(filePath);

    if (jsonOutput) {
        console.log(jsonOutput);
        // Optionally save to json file:
        fs.writeFileSync("output_song-jianti.json", jsonOutput, 'utf-8');
    }
}