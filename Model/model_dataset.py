import os
import sys
import shutil

data_path = r"C:\Users\rahul\Desktop\Final Year Project\DataSet\archive\Indian Medicinal Leaves Image Datasets\Medicinal Leaf dataset"
training_path = r"C:\Users\rahul\Desktop\Final Year Project\project\Model\dataset\training"
test_path = r"C:\Users\rahul\Desktop\Final Year Project\project\Model\dataset\test"

folders = os.scandir(data_path)

for data in folders:
    temp_training = os.path.join(training_path, data.name)
    temp_test = os.path.join(test_path, data.name)
    os.mkdir(temp_training)
    os.mkdir(temp_test)
    img_folder = os.path.join(data_path, data.name)
    images = os.scandir(img_folder)
    img_counter = 0
    for img in images:
        if img_counter <= (35):
            shutil.copy(os.path.join(img_folder, img), temp_test)
        else:
            shutil.copy(os.path.join(img_folder, img), temp_training )
        img_counter += 1
        
        
