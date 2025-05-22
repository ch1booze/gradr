import pandas as pd

def title_case_hyphenated(name: str) -> str:
    # Apply title case to each hyphen-separated part
    return '-'.join(part.strip().capitalize() for part in name.split('-'))

def split_and_format_name(full_name: str):
    # Split the name and trim spaces
    parts = full_name.strip().split()
    
    # Pad with empty strings if less than 3 parts
    parts += [''] * (3 - len(parts))
    
    # Take exactly 3 parts: first, middle, last
    first, middle, last = parts[:3]
    
    return (
        title_case_hyphenated(first),
        title_case_hyphenated(middle),
        title_case_hyphenated(last),
    )

# Load CSV
df = pd.read_csv("names.csv")  # Replace with your actual CSV file

# Apply processing
df[['last_name', 'first_name', 'middle_name']] = df['Names'].apply(
    lambda name: pd.Series(split_and_format_name(name))
)

# Save or print result
df.to_csv("formatted_names.csv", index=False)
