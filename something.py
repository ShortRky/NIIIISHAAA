import time
import math
import random
import shutil
from sys import platform

class ZenGarden:
    def __init__(self):
        self.width, self.height = shutil.get_terminal_size()
        self.height -= 2  # Account for status lines
        self.grid = [[' ' for _ in range(self.width)] for _ in range(self.height)]
        self.patterns = ['░','▒','▓','█','▄','▀','▌']
        self.ripple_chars = ['•', '◦', '○', '⨀', '⨁']
        self.fall_speed = 0.05
        self.transition_steps = 20

    def clear_screen(self):
        print('\033[2J\033[H', end='')

    def draw(self):
        self.clear_screen()
        print('\n'.join([''.join(row) for row in self.grid]))
        print(f"Digital Zen Garden | Q: Quit | Current Mode: {self.current_mode}".ljust(self.width))
        print("Patterns: ░▒▓█▄▀▌  Ripples: •◦○⨀⨁".ljust(self.width))

    def transition(self, new_grid):
        for step in range(self.transition_steps):
            for y in range(self.height):
                for x in range(self.width):
                    if random.random() < 0.3:
                        self.grid[y][x] = new_grid[y][x] if step/self.transition_steps > 0.5 else self.grid[y][x]
            self.draw()
            time.sleep(0.02)

    def generate_pattern(self):
        new_grid = [[' ' for _ in range(self.width)] for _ in range(self.height)]
        pattern = random.choice([self.waves, self.spirals, self.radial])
        pattern(new_grid)
        self.transition(new_grid)
        self.grid = new_grid

    def waves(self, grid):
        for y in range(self.height):
            phase = time.time() * 2
            for x in range(self.width):
                wave = int(5 * (1 + (x/10 + phase) % 1))
                grid[y][x] = self.patterns[wave % len(self.patterns)]

    def spirals(self, grid):
        center_x, center_y = self.width//2, self.height//2
        angle = time.time()
        for r in range(1, max(center_x, center_y)):
            for θ in range(0, 314*2, 10):
                x = int(center_x + r * 0.3 * (θ/100) * math.cos(θ + angle))
                y = int(center_y + r * 0.3 * (θ/100) * math.sin(θ + angle))
                if 0 <= x < self.width and 0 <= y < self.height:
                    grid[y][x] = self.patterns[r % len(self.patterns)]

    def radial(self, grid):
        center_x, center_y = self.width//2, self.height//2
        max_dist = math.sqrt(center_x**2 + center_y**2)
        for y in range(self.height):
            for x in range(self.width):
                dx = x - center_x
                dy = y - center_y
                dist = math.sqrt(dx**2 + dy**2)
                angle = math.atan2(dy, dx)
                pattern_idx = int((dist/max_dist)*5 + angle*2) % len(self.patterns)
                grid[y][x] = self.patterns[pattern_idx]

    def run(self):
        self.current_mode = "Wave Pattern"
        while True:
            self.generate_pattern()
            time.sleep(5)

if __name__ == "__main__":
    try:
        zg = ZenGarden()
        zg.run()
    except KeyboardInterrupt:
        print("\nPeaceful gardening completed. \U0001F338")