import os
import mlflow
import json
from datetime import datetime
import pandas as pd
import torch

# 1. SET TRACKING URI
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("distilbert-emotion-classifier")

# 2. PATHS & PARAMS
eval_report_path = "E:/Semester 4/TWS/PBL/classification_report.json"
model_path = "E:/Semester 4/TWS/PBL/sentiment_model"

# 3. DATASET INFO
datasets = {
    "training": {
        "path": "E:/Semester 4/TWS/training.csv",
        "description": "Training dataset for emotion classification",
        "num_samples": 16000
    },
    "validation": {
        "path": "E:/Semester 4/TWS/validation.csv",
        "description": "Validation dataset for emotion classification",
        "num_samples": 2000
    },
    "test": {
        "path": "E:/Semester 4/TWS/test.csv",
        "description": "Test dataset for emotion classification",
        "num_samples": 2000
    }
}

try:
    # 4. LOAD EVALUATION REPORT
    with open(eval_report_path, "r") as f:
        cls_report = json.load(f)
    
    # 5. CREATE UNIQUE RUN NAME
    run_name = f"distilbert_sentiment_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    with mlflow.start_run(run_name=run_name):
        # A. LOG DATASET INFO
        mlflow.log_dict(datasets, "datasets.json")
        mlflow.set_tag("training_dataset", datasets["training"]["path"])
        mlflow.set_tag("validation_dataset", datasets["validation"]["path"])
        mlflow.set_tag("test_dataset", datasets["test"]["path"])
        
        # B. LOG PARAMETERS
        params = {
            "num_train_epochs": 1,
            "per_device_train_batch_size": 4,
            "per_device_eval_batch_size": 4,
            "logging_steps": 10
        }
        mlflow.log_params(params)
        
        # C. LOG METRICS
        label_map = {0: "sadness", 1: "joy", 2: "love", 3: "anger", 4: "fear", 5: "others"}
        
        for label_id, scores in cls_report.items():
            if label_id.isdigit():
                label_name = label_map[int(label_id)]
                for metric, value in scores.items():
                    clean_metric = metric.replace(" ", "_").lower()
                    mlflow.log_metric(f"{label_name}_{clean_metric}", value)
        
        mlflow.log_metric("accuracy", cls_report["accuracy"])
        
        for avg_type in ["macro avg", "weighted avg"]:
            if avg_type in cls_report:
                for metric, value in cls_report[avg_type].items():
                    clean_metric = metric.replace(" ", "_").lower()
                    mlflow.log_metric(f"{avg_type.replace(' ', '_')}_{clean_metric}", value)
        
        # D. LOG ARTIFACTS
        mlflow.log_artifact(eval_report_path)
        mlflow.log_dict(label_map, "label_map.json")
        
        # E. LOG TAGS
        mlflow.set_tag("model_type", "DistilBERT")
        mlflow.set_tag("dataset", "Twitter emotion")
        
        # F. LOG MODEL ARTIFACTS
        print("Logging model artifacts...")
        
        # 1. Log folder model
        mlflow.log_artifacts(model_path, artifact_path="model")
        
        # 2. Buat file MLmodel manual
        mlmodel_content = f"""name: distilbert-emotion-classifier
flavors:
  pytorch:
    model_data: model
    pytorch_version: "{torch.__version__}"
model_path: model
signature:
  inputs: [{{"type": "string", "name": "text"}}]
  outputs: [{{"type": "tensor", "tensor-spec": {{"dtype": "float32", "shape": [-1, 6]}}}}]
"""
        mlflow.log_text(mlmodel_content, "model/MLmodel")
        
        # 3. Buat input example
        mlflow.log_dict({"inputs": ["I'm feeling happy today!"]}, "model/input_example.json")
        
        print("Model artifacts logged")
        
        # G. LOG DATASET SAMPLE
        try:
            train_sample = pd.read_csv(datasets["training"]["path"], nrows=10)
            val_sample = pd.read_csv(datasets["validation"]["path"], nrows=5)
            test_sample = pd.read_csv(datasets["test"]["path"], nrows=5)

            train_sample.to_csv("train_sample.csv", index=False)
            val_sample.to_csv("val_sample.csv", index=False)
            test_sample.to_csv("test_sample.csv", index=False)
            
            mlflow.log_artifact("train_sample.csv")
            mlflow.log_artifact("val_sample.csv")
            mlflow.log_artifact("test_sample.csv")
            
            print("Dataset samples logged")
        except Exception as e:
            print(f"Failed to log dataset samples: {str(e)}")
        
        print(f"Run '{run_name}' completed successfully!")

except Exception as e:
    print(f"Error: {str(e)}")
    import traceback
    traceback.print_exc()