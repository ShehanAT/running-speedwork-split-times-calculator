import math 
import sys 


def convert_str_times_to_int_times(split_times):
    split_times_in_seconds = []
    for i in range(len(split_times)):
        minutes_and_seconds = split_times[i].split(":")
        str_minutes = minutes_and_seconds[0]
        str_seconds = minutes_and_seconds[1]
        try: 
            minutes = int(str_minutes)
            seconds = int(str_seconds)
            
            minutes_to_seconds = minutes * 60
            minutes_to_seconds += seconds 
            
            split_times_in_seconds.append(minutes_to_seconds)

        except:
            print("ConversionError: Str to Int Conversion Error")
    return split_times_in_seconds


def convert_seconds_to_minutes(seconds):
    str_total_time = ""

    minutes = int(seconds // 60) 
    str_minutes = str(minutes)
    remainder = seconds % 60
    
    if(remainder > 0):
        str_remainder = str(math.floor(remainder))
        str_total_time = str_minutes + ":" + str_remainder
        milliseconds_factional = remainder % 1
        if(milliseconds_factional > 0):
            int_milliseconds = 60 * milliseconds_factional
            str_milliseconds = str(math.ceil(int_milliseconds))
            str_total_time += ":" + str_milliseconds
        else:
            str_total_time += ":00"
    else:
        str_total_time = str_minutes + ":00:00"
    return str_total_time 

def calculate_mean_split_times(split_times):
    total_time = 0
    for i in range(len(split_times)):
        total_time += split_times[i]
    number_of_splits = len(split_times)
    mean_split_time_in_seconds = total_time / number_of_splits
    return convert_seconds_to_minutes(mean_split_time_in_seconds)
    
def main():
    sys_argv_len = len(sys.argv)
    cli_split_times = []
    if(sys_argv_len > 1):
        for i in range(1, sys_argv_len):
            cli_split_times.append(sys.argv[i])

        int_times = convert_str_times_to_int_times(cli_split_times)
        print("Mean split time: ")
        print(calculate_mean_split_times(int_times))
    else:
        print("Please enter your running split times in the following format MM:SS, as command line arguments separated by a space")
    return 0 
    
if __name__ == '__main__':
    main()