package orchestration

default deny := []

is_high_risk if {
  input.risk_level == "high"
}

is_high_risk if {
  input.risk_level == "critical"
}

touches_data_layer if {
  some f in input.changed_files
  startswith(f, "backend/alembic/")
}

touches_data_layer if {
  some f in input.changed_files
  startswith(f, "backend/app/models/")
}

touches_data_layer if {
  some f in input.changed_files
  contains(lower(f), "migration")
}

touches_data_layer if {
  some f in input.changed_files
  contains(lower(f), "schema")
}

touches_frontend if {
  some f in input.changed_files
  startswith(f, "frontend/")
}

deny contains msg if {
  input.command_preview != ""
  re_match("(^|\\s)git\\s+reset\\s+--hard(\\s|$)", lower(input.command_preview))
  msg := "Destructive git reset --hard is not allowed."
}

deny contains msg if {
  input.command_preview != ""
  re_match("(^|\\s)git\\s+checkout\\s+--(\\s|$)", lower(input.command_preview))
  msg := "Destructive git checkout -- is not allowed."
}

deny contains msg if {
  input.command_preview != ""
  re_match("(^|\\s)rm\\s+-rf\\s+/($|\\s)", lower(input.command_preview))
  msg := "Destructive rm -rf / is not allowed."
}

deny contains msg if {
  is_high_risk
  touches_data_layer
  input.workspace_id_mentions == 0
  msg := "High-risk data changes require workspace_id filtering evidence."
}

deny contains msg if {
  is_high_risk
  touches_frontend
  input.x_workspace_id_mentions == 0
  msg := "High-risk frontend tenant changes require X-Workspace-ID evidence."
}
