# TODO: add round timer to know when to go up / down
# TODO: add in other buttons / players
# TODO: add in if players push button when light isn't in their zone, ignore
# TODO: add in heart tracker (to know how many misses they had), hearts start lit up & turn off when they miss
# TODO: add in sound effects??
# TODO: add in loser UI (perhaps all red lights for the player)
# TODO: add in winner UI (perhaps all green lights for the player)
# TODO: light up button for who's turn?
# TODO: add another button for starting the game/round?

# SPDX-FileCopyrightText: 2020 Liz Clark for Adafruit Industries
#
# SPDX-License-Identifier: MIT

import time
import random
import board
from rainbowio import colorwheel
import neopixel
import digitalio
import adafruit_led_animation.color as color


class GameLights:
    def __init__(self, pixel_map):
        self.pixel_map = pixel_map


pixel_map = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9:9,
    # 10 pixel is target
    10: 11,
    # 12 pixel is target
    11: 13,
    # 14 pixel is target
    12: 15,
    13: 16,
    14: 17,
    15: 18,
    16: 19,
    17: 20,
    18: 21,
    19: 22,
    20: 23,
    21: 24 ,
    22: 25,
    23: 26,
    24: 27,
    25: 28,
    26: 29,
    27: 30,
    28: 31,
    29: 32,
    30: 33,
    31: 34,
    # 35 pixel is target
    32: 36,
    # 37 pixel is target
    33: 38,
    # 39 pixel is target
    34: 40,
    35: 41,
    36: 42,
    37: 43,
    38: 44,
    39: 45,
    40: 46,
    41: 47,
    42: 48,
    43: 49,
    44: 50,
    45: 51,
    46: 52,
    47: 53,
    48: 54,
    49: 55,
    50: 56,
    51: 57,
    52: 58,
    # 59 pixel is target
    53: 60,
    # 61 pixel is target
    54: 62,
    # 63 pixel is target
    55: 64,
    56: 65,
    57: 66,
    58: 67,
    59: 68,
    60: 69,
    61: 70,
    62: 71,
    63: 72,
    64: 73,
    65: 74,
    66: 75,
    67: 76,
    68: 77,
    69: 78,
    70: 79,
    71: 80,
    72: 81,
    73: 82,
    74: 83,
    75: 84,
    # 85 pixel is target
    76: 86,
    # 87 pixel is target
    77: 88,
    # 89 pixel is target
    78: 90,
    79: 91,
    80: 92,
    81: 93,
    82: 94,
    83: 95,
    84: 96,
    85: 97,
    86: 98,
    87: 99,
}


# given 0-49 for array
# 0-24 for player 1
# pixel 0-9 lights
# pixel 10, 12, 14 for hearts
# pixel 11, 13 for lights
# pixel 15-24 for hearts
class Player:
    min_board_index = -1
    max_board_index = -1
    target_index = -1
    hearts = {}
    lives = 3

    def __init__(self, starting_index, color):
        self.min_board_index = starting_index
        self.max_board_index = starting_index + 24
        self.target_index = starting_index + 11
        self.color = color
        self.hearts = {
            "heart1": {"index": (starting_index + 10), "active": True},
            "heart2": {"index": (starting_index + 12), "active": True},
            "heart3": {"index": (starting_index + 14), "active": True},
        }

        # self.target_game_pixel_index = starting_index + 1
        # self.target_game_pixel_right_index = starting_index + 2

    # def __init__(self, target_game_pixel_left_index, target_game_pixel_index, target_game_pixel_right_index, score_ticks):
    #     self.target_game_pixel_left_index = target_game_pixel_left_index
    #     self.target_game_pixel_index = target_game_pixel_index
    #     self.target_game_pixel_right_index = target_game_pixel_right_index

    # self.score_ticks = score_ticks


class ScoreTicks:
    def __init__(self, left_pixel_index, middle_pixel_index, right_pixel_index):
        self.left_pixel_index = left_pixel_index
        self.middle_pixel_index = middle_pixel_index
        self.right_pixel_index = right_pixel_index


def rainbow_cycle(wait_time: float) -> None:
    """
    Cycles through all 256 colors of the rainbow on the neopixels.

    :param wait_time: The time to wait between each color in seconds.
    """
    for color_index in range(256):
        for pixel_index in range(num_pixels):
            pixels[pixel_map[pixel_index]] = colorwheel(
                (pixel_index * 256 // num_pixels) + color_index
            )
            # for j in range(255):
            #     for i in range(num_pixels):
            #         rc_index = (i * 256 // 10) + j
            #         pixels[i] = colorwheel(rc_index & 255)
        pixels.show()
        time.sleep(wait_time)


#  color_chase setup
def color_chase(color: tuple, wait_time: float) -> None:
    """
    Chases the given color across the neopixels.

    :param color: The color to chase. A tuple of RGB values.
    :param wait_time: The time between each pixel in seconds.
    """
    for pixel_index in range(pixel_map):
        pixels[pixel_map[pixel_index]] = color
        pixels.show()
        time.sleep(wait_time)

    # for i in range(num_pixels):
    #     pixels[i] = c
    #     time.sleep(wait)
    #     pixels.show()
    # time.sleep(0.5)


#  function to blink the neopixels when you lose
def game_over() -> None:
    """
    Flashes the neopixels red and black to signal the end of the game.
    """
    for _ in range(5):
        pixels.fill(color.BLACK)
        pixels.show()
        time.sleep(0.05)
        pixels.fill(color.RED)
        pixels.show()
        time.sleep(0.05)
    # color_chase(color.BLACK, 0.05)
    # pixels.fill(color.RED)
    # pixels.show()
    # time.sleep(0.5)
    # pixels.fill(color.BLACK)
    # pixels.show()
    # time.sleep(0.5)
    # pixels.fill(color.RED)
    # pixels.show()
    # time.sleep(0.5)
    # pixels.fill(color.BLACK)
    # pixels.show()
    # time.sleep(0.5)
    # pixels.fill(color.RED)
    # pixels.show()
    time.sleep(1)


# TODO: expand this to the 100 lights
# 20 pixel game strip - map from game pixels to physical pixels
# pixel_map = {i:i for i in range(100)}
# pixel_map = {
#     0: 26,
#     1: 27,
#     # heart1: 28
#     2: 29,
#     # heart2: 30
#     3: 31,
#     # heart3: 32
#     4: 33,
#     5: 34,
#     6: 35,
#     7: 36,
#     8: 37,
#     9: 38,
#     10: 39,
#     11: 40,
#     12: 41,
#     13: 42,
#     14: 43,
#     15: 44,
#     16: 45,
#     17: 46,
#     18: 47,
#     19: 48,
#     20: 49,
# }

# game_lights = GameLights(pixel_map)

player1 = Player(starting_index=0, color=color.GREEN)
player2 = Player(starting_index=25, color=color.YELLOW)
# player3 = Player(starting_index=50, color=color.BLUE)
# player4 = Player(starting_index=75, color=color.RED)

# player1 = Player(
#     target_game_pixel_left_index=17,
#     target_game_pixel_index=16,
#     target_game_pixel_right_index=15,
#     score_ticks=ScoreTicks(
#         left_pixel_index=32,
#         middle_pixel_index=30,
#         right_pixel_index=28,
#     )
# )

# player2 = Player(
#     target_game_pixel_left_index=6,
#     target_game_pixel_index=5,
#     target_game_pixel_right_index=4
# )


#  button pin setup
player1_button = digitalio.DigitalInOut(board.GP6)
player1_button.direction = digitalio.Direction.INPUT
player1_button.pull = digitalio.Pull.UP

# player2_button = digitalio.DigitalInOut(board.GP9)
# player2_button.direction = digitalio.Direction.INPUT
# player2_button.pull = digitalio.Pull.UP

# player3_button = digitalio.DigitalInOut(board.GP13)
# player3_button.direction = digitalio.Direction.INPUT
# player3_button.pull = digitalio.Pull.UP

# player4_button = digitalio.DigitalInOut(board.GP16)
# player4_button.direction = digitalio.Direction.INPUT
# player4_button.pull = digitalio.Pull.UP

#  neopixel setup
pixel_pin = board.GP17
# num_pixels = 50

# pixels = neopixel.NeoPixel(pixel_pin, num_pixels, brightness=0.3, auto_write=False)

#  variables and states
lowest_index = 0
pixel = 0
num = lowest_index
last_num = lowest_index  # maybe randomize start
now_color = 0
next_color = 1
speed = 0.1  # the lower, the faster
level = 0.005
final_level = 0.001
new_target = True
player1_button_state = False
player2_button_state = False
player3_button_state = False
player4_button_state = False
increment = 1
round_over = False

chaser_index = 0
active_players = []
active_players.append(player1)
active_players.append(player2)
# active_players.append(player3)
# active_players.append(player4)


#  neopixel colors
colors = [
    color.GREEN,
    color.ORANGE,
    color.YELLOW,
    color.RED,
    color.TEAL,
    color.CYAN,
    color.BLUE,
    color.PURPLE,
    color.MAGENTA,
    color.GOLD,
    color.AQUA,
    color.PINK,
]

# game start here

# create game board
# pixel_map = []
skip_pixel_list = []
for player in active_players:
    temp = [i for i in range(player.min_board_index, player.min_board_index + 25)]
    # pixel_map = append(temp)
    # print(temp)
    for key in player.hearts:
        heart_index = player.hearts[key]["index"]
        temp.remove(heart_index)
        skip_pixel_list.append(heart_index)
    # pixel_map = temp.append(pixel_map)
    # pixel_map.extend(temp)
    # print(pixel_map)

print(pixel_map)
print(f"length of pixel_map: {len(pixel_map)}")
num_pixels = len(pixel_map)
# num_pixels = len(active_players)*22
pixels = neopixel.NeoPixel(
    pixel_pin,
    # num_pixels, # changing to actual number
    100,
    brightness=0.3,
    auto_write=False,
    pixel_order=neopixel.RGB,  # TODO: figure out if it's RGB or GRB
)
num = 0
game_lights = GameLights(pixel_map)

print("starting up")
print(player1.target_index)
print(player2.target_index)
# print(player3.target_index)
# print(player4.target_index)
# print(f'{pixels}')

while True:  # runs as fast as possible on the raspberry pi pico
    #  TODO: send status to an API?

    for player in active_players:
        # print(f'player: {player.color}')
        # print(f'target_index: {player.target_index}')
        # turn on their strike zone
        pixels[player.target_index - 2] = color.WHITE
        pixels[player.target_index] = color.GOLD
        pixels[player.target_index + 2] = color.WHITE

        for key in player.hearts:
            heart = player.hearts[key]
            # print(f'key: {heart}')
            # print(f'index: {heart["index"]}')
            # print(f'active: {heart["active"]}')
            if heart["active"]:
                pixels[heart["index"]] = color.RED

    #  button debouncing
    if not player1_button.value and not player1_button_state:
        # if not player2_button.value and not player2_button_state:
        #     if not player3_button.value and not player3_button_state:
        #         if not player4_button.value and not player4_button_state:
        player1_button_state = True
        # player2_button_state = True
        # player3_button_state = True
        # player4_button_state = True


    # starting a new round
    if round_over:
        # game_over()
        round_over = False

    x = player1.target_index - 2
    y = player1.target_index
    z = player1.target_index + 2

    #  if new level starting..
    # if new_target:
    #     #  randomize target location
    #     y = int(random.randint(lowest_index + 5, num_pixels - 5)) # the target
    #     x = int(y - 1)
    #     z = int(y + 1)
    #     new_target = False
    #     print(f'New Target will be at {x}, {y}, {z}')
    # pixels[x] = color.WHITE
    # pixels[y] = colors[next_color]
    # pixels[z] = color.WHITE
    #  delay without time.sleep()
    if (pixel + speed) < time.monotonic():
        print(num)
        print(increment)
        #  turn off pixel behind chaser
        if num > lowest_index:  # probably -1
            last_num = num - increment
            pixels[pixel_map[last_num]] = color.BLACK
            pixels.show()
        #  keep target pixels their colors when the chaser passes
        # if last_num in (x, y, z):
        #     pixels[x] = color.WHITE
        #     pixels[y] = colors[next_color]
        #     pixels[z] = color.WHITE
        #  move chaser pixel by one
        if num < num_pixels:
            pixels[pixel_map[num]] = colors[now_color]
            pixels.show()
            # print(num)
            # print("target is", y)
            num += increment
            # if num in skip_pixel_list:
            #     print(f'{num} is skipped')
            #     num += increment
        #  send chaser back to the beginning of the circle
        if num == num_pixels or num == lowest_index - 1:
            last_num = num - increment
            pixels[pixel_map[last_num]] = color.BLACK
            pixels.show()
            # num = 0
            increment *= -1
            # print(increment)
            num += increment * 2

        #  if the chaser hits the target...
        if last_num in [x, y, z] and not player1_button.value:
            player1_button_state = False
            player2_button_state = False
            player3_button_state = False
            player4_button_state = False
            #  fills with the next color
            pixels.fill(colors[next_color])
            pixels.show()
            print(num)
            print(f"Target will be at {x}, {y}, {z}")
            #  chaser resets
            num = lowest_index
            time.sleep(0.5)
            pixels.fill(color.BLACK)
            pixels.show()
            #  speed increases for next level
            speed = speed - level
            #  color updates
            next_color = next_color + 1
            if next_color > 11:
                next_color = 0
            now_color = now_color + 1
            if now_color > 11:
                now_color = 0
            #  setup for new target
            new_target = True
            print("speed is", speed)
            print("player 1 button is", player1_button.value)
        #  if the chaser misses the target...
        if last_num not in [x, y, z] and not player1_button.value:
            player1_button_state = False
            player2_button_state = False
            player3_button_state = False
            player4_button_state = False
            print(num)
            print(f"Target reset will be at {x}, {y}, {z}")
            #  fills with current chaser color
            pixels.fill(colors[now_color])
            pixels.show()
            #  function to flash all pixels red
            game_over()
            #  chaser is reset
            num = lowest_index
            pixels.fill(color.BLACK)
            pixels.show()
            #  speed is reset to default
            speed = 0.1
            #  colors are reset
            next_color = 1
            now_color = 0
            #  setup for new target
            new_target = True
            print("speed is", speed)
            print("player 1 button is", player1_button.value)
        #  when you have beaten all the levels...
        if speed < final_level:
            #  rainbows!
            rainbow_cycle(0.01)
            time.sleep(1)
            #  chaser is reset
            num = lowest_index
            pixels.fill(color.BLACK)
            pixels.show()
            #  speed is reset to default
            speed = 0.1
            #  colors are reset
            next_color = 1
            now_color = 0
            #  setup for new target
            new_target = True
        #  time.monotonic() is reset for the delay
        pixel = time.monotonic()
