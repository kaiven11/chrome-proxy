#!/usr/bin/env python3
"""
创建代理认证扩展的图标文件
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """创建指定尺寸的图标"""
    # 创建图像
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 绘制背景圆形
    margin = size // 8
    draw.ellipse([margin, margin, size-margin, size-margin], 
                fill=(66, 133, 244, 255), outline=(33, 103, 214, 255), width=2)
    
    # 绘制锁的图标
    lock_size = size // 3
    lock_x = (size - lock_size) // 2
    lock_y = (size - lock_size) // 2
    
    # 锁身
    body_height = lock_size // 2
    body_y = lock_y + lock_size // 4
    draw.rectangle([lock_x, body_y, lock_x + lock_size, body_y + body_height], 
                  fill=(255, 255, 255, 255))
    
    # 锁环
    ring_size = lock_size // 2
    ring_x = lock_x + (lock_size - ring_size) // 2
    ring_y = lock_y
    draw.arc([ring_x, ring_y, ring_x + ring_size, ring_y + ring_size], 
             start=0, end=180, fill=(255, 255, 255, 255), width=3)
    
    # 保存图标
    img.save(filename, 'PNG')
    print(f"Created {filename} ({size}x{size})")

def main():
    """主函数"""
    # 确保icons目录存在
    os.makedirs('icons', exist_ok=True)
    
    # 创建不同尺寸的图标
    sizes = [16, 48, 128]
    for size in sizes:
        create_icon(size, f'icons/icon{size}.png')
    
    print("所有图标创建完成！")

if __name__ == '__main__':
    main()
