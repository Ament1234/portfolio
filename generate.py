import os
import shutil
import yaml
from jinja2 import Environment, FileSystemLoader

def build_site():
    print("Building static site...")
    
    # Define paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    content_file = os.path.join(base_dir, 'content.yaml')
    templates_dir = os.path.join(base_dir, 'templates')
    static_dir = os.path.join(base_dir, 'static')
    dist_dir = os.path.join(base_dir, 'dist')
    
    # 1. Load data
    with open(content_file, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        
    # 2. Setup Jinja2 environment
    env = Environment(loader=FileSystemLoader(templates_dir))
    template = env.get_template('index.html')
    
    # 3. Render HTML
    rendered_html = template.render(data=data)
    
    # 4. Prepare dist directory
    if os.path.exists(dist_dir):
        shutil.rmtree(dist_dir)
    os.makedirs(dist_dir)
    
    # 5. Write HTML to dist/index.html
    output_file = os.path.join(dist_dir, 'index.html')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(rendered_html)
    
    # 6. Copy static assets
    dist_static_dir = os.path.join(dist_dir, 'static')
    shutil.copytree(static_dir, dist_static_dir)
    
    print(f"Site successfully built in {dist_dir}!")

if __name__ == "__main__":
    build_site()
