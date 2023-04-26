#!/usr/bin/env python3

import sys

def transform_input(input_text):
    lines = input_text.strip().split('\n')
    output = "flashcards:\n"

    for line in lines:
        term, definition = line.split(': ', 1)
        output += f'  - "{term}": "{definition}"\n'

    return output

def main():
    if len(sys.argv) != 2:
        print("Usage: ./flashcard_converter.py <input_file>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = input_file.rsplit('.', 1)[0] + '.yml'

    with open(input_file, 'r') as infile:
        input_text = infile.read()

    output_text = transform_input(input_text)

    with open(output_file, 'w') as outfile:
        outfile.write(output_text)

    print(f"Output written to {output_file}")

if __name__ == "__main__":
    main()
