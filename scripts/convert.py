import re
import json

def extract_contents_from_text_file(file_path):
    """
    Extracts content from a text file, following numbered sections (like 1.1, 2.1, etc.)
    and formats it into a JSON structure.

    Args:
        file_path (str): The path to the input text file.

    Returns:
        str: A JSON string representing the extracted content, or None if an error occurs.
    """
    extracted_data = []
    current_item = None

    try:
        with open(file_path, 'r', encoding='utf-8') as file:  # Open file with utf-8 encoding
            for line in file:
                line = line.strip()  # Remove leading/trailing whitespace
                print('line',line)
                if not line:  # Skip empty lines
                    continue

                match = re.match(r"^\d+\.\d+\s+(.*)", line)  # Regex to find lines starting with "number.number "
                if match:
                    if current_item:  # Save the previous item if exists
                        extracted_data.append(current_item)
                    name = match.group(1).strip() # Extract name after the number and space
                    current_item = {"name": name, "trans": []} # Initialize new item
                    # Append the name line itself as the first element of trans
                    # current_item["trans"].append(line) # if you want to include number line also in trans

                elif current_item: # If not a name line and we have a current item, it's a trans line
                    current_item["trans"].append(line) # Append to trans list

            if current_item: # Append the last item after file reading is done
                extracted_data.append(current_item)

        return json.dumps(extracted_data, indent=4, ensure_ascii=False) # Convert to JSON, indent for readability, ensure_ascii=False for non-ascii chars

    except FileNotFoundError:
        print(f"Error: File not found at path: {file_path}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == "__main__":
    file_path = "桂林古本伤寒杂病论·简体.txt"  # Replace "input.txt" with your text file name

    # Create a dummy input_chinese.txt file for testing (optional, if you don't have one)
    # with open(file_path, 'w', encoding='utf-8') as f:
        # f.write("1.1 问: 脉何以知气血脏腑之诊也？师曰: 脉乃气血先见，气血有盛衰，脏腑有偏胜。气血俱盛，脉阴阳俱盛；气血俱衰，脉阴阳俱衰。气独胜者，则脉强；血独盛者，则脉滑；气偏衰者，则脉微；血偏衰者，则脉涩；气血和者，则脉缓；气血平者，则脉平；气血乱者，则脉乱；气血脱者，则脉绝；阳气血，则脉数；阴阳气血，则脉迟；若感于邪，气血扰动，脉随变化，变化无穷，气血使之；病变百端，本原别之；欲知病源，当凭脉变；欲知病变，先揣其本，本之不齐，在人体躬，相体以诊，病无遁情。\n")
        # f.write("\n")
        # f.write("1.2 问: 脉有三部，阴阳相乘。荣卫血气，在人体躬。呼吸出入，上下于中，因息游布，津液流通。随时动作，肖象形容，春秋弦浮，冬沉夏洪。察色观脉，大小不同，一时之间，变无经常，尺寸参差，或短或长。上下乖错，或存或亡。病辄改易，进退低昂。心迷意惑，动失纪纲。愿为具陈，令得分明。师曰: 子之所问，道之根源。脉有三部，尺寸及关。荣卫流行，不失衡铨。肾沉、心洪、肺浮、肝弦，此自经常，不失铢分。出入升降，漏洞周旋。水下百刻，一周循环。当食过口，虚实变动。变化相乘，阴阳相干。风则浮虚，寒则牢坚；沉潜水蓄，支饮急弦；动则为痛，数则热烦。设有不应，知变所缘，三部不同，病各异端。太过可怪，不及亦然，邪不空见，必中有奸，审察表里，三焦别焉，知其所舍，消息诊看，料度脏腑，独见若神。为子条记，传与贤人。\n")
        # f.write("\n")
        # f.write("1.3 师曰: 平脉大Class，脉分三部。浮部分经，以候皮肤经络之气；沉部分经，以候五脏之气；中部份经，以候六腑之气。\n")

    print('=====')
    json_output = extract_contents_from_text_file(file_path)

    if json_output:
        print(json_output)
        # Optionally save to a json file:
        with open("output_chinese.json", 'w', encoding='utf-8') as outfile:
            outfile.write(json_output)